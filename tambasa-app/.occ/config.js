module.exports = {
    "httpHost": "localhost",
    "httpPort": 4141,
    "httpsHost": "localhost",
    "httpsPort": 443,
    "sslKey": "config/ssl/key.pem",
    "sslCert": "config/ssl/cert.pem",
    "serverEnv": "development",
    "appName": "tambasa-store",
    "dsAssetMode": "local",
    "verbose": false,
    "live": false,
    "appContext": "development",
    "userName": "diego.camara",
    "serverConfig": {
        "development": {
            "appServerAdmin": "https://a9263388c1dev-admin.occa.ocs.oraclecloud.com",
            "appServer": "http://localhost:8080",
            "appKey": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDZmYTVmZi1lOGI1LTQ3MjgtYjhhMS1kNjY4ZThjYTdjODQiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE2NjE2MTA3ODYsImlhdCI6MTYzMDA3NDc4Nn0=.uOyuQ/ytC+zH581w4kVhY8yIs8WZr7RX01+Qe4FpyGQ="
        },
        "test": {
            "appServerAdmin": "https://a9263388c1tst-admin.occa.ocs.oraclecloud.com",
            "appServer": "http://localhost:8081",
            "appKey": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWQ1YWNlMy1jNDI5LTQ1OWUtYTYxZS1jNzcxMDFmZmE4MGYiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE2NjM2OTU4MjAsImlhdCI6MTYzMjE1OTgyMH0=.+N4D3LWlo8MCxF/sPmc9bbio/BL6jgsM7Acd0A/rNtE="
        },
        "production": {
            "appServerAdmin": "https://a9263388c1prd-admin.occa.ocs.oraclecloud.com/occ-admin",
            "appServer": "http://localhost:8082",
            "appKey": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZmJkYmE2ZS0zMTUxLTRkY2QtYjg2NC1lYzE3NmU4YjEyMTMiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE2NjM2OTYwMjEsImlhdCI6MTYzMjE2MDAyMX0=.U17zWtchwVdAoHCTpaiUYQTlv7OQ8r93swLopFU4/z8="
        }
    }
};