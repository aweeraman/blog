<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div
      style='background-color:#F8F4F0;color:#3A3430;font-family:Georgia,"Times New Roman",serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table align="center" width="100%" style="margin:0 auto;max-width:600px;background-color:#FFFFFF" role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tbody>
          <tr style="width:100%">
            <td>
              <h3 style="font-weight:bold;margin:0;font-size:20px;padding:16px 24px 16px 24px;font-family:Georgia,'Times New Roman',serif;">
                Hello {{ .Subscriber.Name }}
              </h3>
              <div style="font-weight:normal;padding:16px 24px 16px 24px">
                <p>
                  This is a test e-mail campaign. Your second name is {{ .Subscriber.LastName }} and this block of text is in Markdown.
                </p>
                <p>
                  Here is a
                  <a href="https://listmonk.app@TrackLink" target="_blank" style="color:#C67D4A;">tracked link</a>.
                </p>
                <p>
                  Use the link icon in the editor toolbar or when writing raw
                  HTML or Markdown, simply suffix @TrackLink to the end of a URL
                  to turn it into a tracking link. Example:
                </p>
                <p><a href="https:/‌/listmonk.app@TrackLink"></a></p>
                <p>
                  For help, refer to the
                  <a href="https://listmonk.app/docs" target="_blank" style="color:#C67D4A;">documentation</a>.
                </p>
              </div>
              <div style="padding:16px 0px 16px 0px">
                <hr style="width:100%;border:none;border-top:1px solid #E8E0D8;margin:0"/>
              </div>
              <div style="padding:16px 24px 16px 24px">
                <a href="https://listmonk.app"
                  style="color:#FFFFFF;font-size:16px;font-weight:bold;background-color:#C67D4A;border-radius:4px;display:inline-block;padding:12px 20px;text-decoration:none;font-family:Georgia,'Times New Roman',serif;"
                  target="_blank">
                  <span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30" hidden>&nbsp;</i><![endif]--></span>
                  <span>This is a button</span>
                  <span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span>
                </a>
              </div>
              <div style="background-color:#F8F4F0;font-size:12px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px">
                <p style="font-size:13px;color:#9A938C;margin:0 0 8px 0;">
                  Anuradha Weeraman &middot; CTO &amp; Co-Founder, Verdentra<br>
                  <a href="https://weeraman.com" style="color:#C67D4A;">weeraman.com</a>
                </p>
                <p>
                  <a href="{{ UnsubscribeURL }}" style="color: #9A938C;">{{ L.T "email.unsub" }}</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="{{ MessageURL }}" style="color: #9A938C;">{{ L.T "email.viewInBrowser" }}</a>
                  {{ TrackView }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
