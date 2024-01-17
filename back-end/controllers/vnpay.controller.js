const moment = require('moment');
const {sortObject} = require('../helper/index')
const User = require('../models/user.model')
const Transaction = require('../models/transaction.model')
const Payment = require('../models/payment.model')
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
});

exports.createPayment = function (req, res, next) {
    console.log("123121231", req.body)
    
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require('config');
    
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    
    let locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json({
        vnpUrl: vnpUrl
    })
}

exports.returnPayment = async (req, res, next) => {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        const user = await User.findById(req.user.id)
                    .populate({
                        path: 'AccountPayment',
                        select: 'balance'
                    })
        const adminId = process.env.ADMINID;
        const admin = await User.findById(adminId)
                    .populate({
                        path: 'AccountPayment',
                        select: 'balance'
                    })
        const AccountAdmin = await Payment.findById(admin.AccountPayment._id)
        const  numericValue = parseFloat(vnp_Params['vnp_Amount'].replace(/[^\d.-]/g, ''));
        AccountAdmin.balance += numericValue;
        if (!user.Transaction) {
            user.Transaction = [];
        }

        if (!admin.Transaction) {
            admin.Transaction = [];
        }
        const transaction = {
                    idUser: user.id,
                    cart_id: user.Cart.map(cart => {
                        return {
                            product_id: cart.product_id,
                            quantity: cart.quantity
                        }
                    }),
                    time: new Date(),
                    moneyTransaction: numericValue / 10000,
                }
        const idTransaction = await Transaction.create(transaction);
        user.Transaction.push(idTransaction)
        admin.Transaction.push(idTransaction)
        user.Cart.splice(0);
        await user.save();
        await admin.save();
        await AccountAdmin.save();
        res.redirect('http://localhost:5173/cart')
    } else{
        res.render('success', {code: '97'})
    }
}

exports.success = (req, res) => {
    res.json({
        status: 'success' 
    })
}