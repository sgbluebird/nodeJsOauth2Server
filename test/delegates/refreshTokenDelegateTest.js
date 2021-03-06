var assert = require('assert');
var db = require("../../database/db");
var refreshTokenDelegate = require("../../delegates/refreshTokenDelegate");
var token;
describe('Refresh token delegate', function () {
    this.timeout(20000);
     describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_oauth2_server", 5);
            setTimeout(function () {
                refreshTokenDelegate.init(db);                
                done();
            }, 1000);
        });
    });
    describe('#generateRefreshToken()', function () {
        it('should generateRefreshToken', function (done) {
            var payload = {
                sub: "code",
                userId: "admin",
                clientId: "jdsldsldsldls"               
            };
            setTimeout(function () {
                refreshTokenDelegate.generateRefreshToken(payload, function (refreshToken) {
                    if (refreshToken) {
                        token = refreshToken;
                        console.log("refresh token: " + refreshToken);
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#validateRefreshToken()', function () {
        it('should validateRefreshToken', function (done) {
            var claims = {
                sub: "code",
                userId: "admin",
                clientId: "jdsldsldsldls"                
            };
            setTimeout(function () {
                refreshTokenDelegate.validateRefreshToken(token, claims, function (valid) {
                    if (valid) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#decodeRefreshToken()', function () {
        it('should decodeRefreshToken', function (done) {
           
            setTimeout(function () {
                refreshTokenDelegate.decodeRefreshToken(token, function (decode) {
                    if (decode && decode.clientId === "jdsldsldsldls" && decode.userId === "admin" && decode.sub === "code") {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });



});



