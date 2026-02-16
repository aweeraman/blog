<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
        <base target="_blank">

        <style>
            body {
                background-color: #F8F4F0;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 15px;
                line-height: 26px;
                margin: 0;
                color: #3A3430;
            }

            pre {
                background: #F0EBE6;
                padding: 2px;
            }

            table {
                width: 100%;
                border: 1px solid #E8E0D8;
            }
            table td {
                border-color: #E8E0D8;
                padding: 5px;
            }

            .wrap {
                background-color: #fff;
                padding: 30px;
                max-width: 525px;
                margin: 0 auto;
                border-radius: 5px;
            }

            .button {
                background: #C67D4A;
                border-radius: 3px;
                text-decoration: none !important;
                color: #fff !important;
                font-weight: bold;
                padding: 10px 30px;
                display: inline-block;
            }
            .button:hover {
                background: #B06A3A;
            }

            .footer {
                text-align: center;
                font-size: 12px;
                color: #9A938C;
            }
                .footer a {
                    color: #9A938C;
                    margin-right: 5px;
                }

            .gutter {
                padding: 30px;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            a {
                color: #C67D4A;
            }
                a:hover {
                    color: #B06A3A;
                }
            @media screen and (max-width: 600px) {
                .wrap {
                    max-width: auto;
                }
                .gutter {
                    padding: 10px;
                }
            }
        </style>
    </head>
<body style="background-color: #F8F4F0;font-family: Georgia, 'Times New Roman', serif;font-size: 15px;line-height: 26px;margin: 0;color: #3A3430;">
    <div class="gutter" style="padding: 30px;">&nbsp;</div>
    <div class="wrap" style="background-color: #fff;padding: 30px;max-width: 525px;margin: 0 auto;border-radius: 5px;">
        <p>Hello {{ .Subscriber.Name }}</p>
        <p>
            <strong>Order number: </strong> {{ .Tx.Data.order_id }}<br />
            <strong>Shipping date: </strong> {{ .Tx.Data.shipping_date }}<br />
        </p>
        <br />
        <p>
            Transactional templates supports arbitrary parameters.
            Render them using <code>.Tx.Data.YourParamName</code>. For more information,
            see the transactional mailing <a href="https://listmonk.app/docs/transactional">documentation</a>.
        </p>
    </div>

    <div class="footer" style="text-align: center;font-size: 12px;color: #9A938C;">
        <div style="border-top:1px solid #E8E0D8;padding-top:16px;margin-top:16px;max-width:525px;margin-left:auto;margin-right:auto;">
            <p style="font-size:13px;color:#9A938C;margin:0 0 8px 0;">
                Anuradha Weeraman &middot; CTO &amp; Co-Founder, Verdentra<br>
                <a href="https://weeraman.com" style="color:#C67D4A;">weeraman.com</a>
            </p>
        </div>
    </div>
</body>
</html>
