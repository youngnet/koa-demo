const koa = require('koa');
const path = require('path');
const mysql = require('mysql');
const koaSession = require('koa-session');
const cors = require('koa-cors');
const os = require('os');
const net = require('net');
const { URL } = require('url');
const util = require('util');

import router from './router';
const app = new koa();
app.keys = [ 'some secret hurr' ];

const dns = require('dns');
dns.lookup('iana.org', (err, address, family) => {
	console.log('IP 地址: %j 地址族: IPv%s', address, family, os.arch());
});

var serverProto = {
	connection: mysql.createConnection({
		host: '127.0.0.1', // 数据库地址
		user: 'root', // 数据库用户
		password: 'centosmysql', // 数据库密码
		database: 'demo' // 选中数据库
	}),
	sessionConfig: {
		key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		autoCommit: true /** (boolean) automatically commit headers (default true) */,
		overwrite: true /** (boolean) can overwrite or not (default true) */,
		httpOnly: true /** (boolean) httpOnly or not (default true) */,
		signed: true /** (boolean) signed or not (default true) */,
		rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
		renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
	},
	init() {
		this.use();
		this.createServer();
	},
	createServer() {
		app.listen(2333, () => {
			console.log('server is listen on 2333');
		});
	},
	use() {
		app.use((ctx, next) => {
			console.log('requestUrl -> ' + ctx.request.url);
			next();
		});
		// cors
		app.use(
			cors({
				credentials: true,
				origin: (params) => {
					if (params.header.host.indexOf('localhost') || params.header.host.indexOf('127.0.0.1')) {
						return params.header.host;
					} else {
						return false;
					}
				}
			})
		);

		app.use(router.routes());
		koaSession(this.sessionConfig, app);
	},
	// 执行sql脚本对数据库进行读写
	getData() {
		return new Promise((resolve, reject) => {
			this.connection.query('SELECT * from userinfo', (error, results, fields) => {
				if (error) throw error;
				// connected!
				// 结束会话
				resolve(results);
			});
			this.connection.end();
		});
	}
};

serverProto.init();
