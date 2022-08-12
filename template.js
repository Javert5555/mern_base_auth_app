export default ({markup, css}) => {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>MERN Sceleton</title>
                ${css}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            </head>
            <body>
                <div id="root">${markup}</div>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>`
}