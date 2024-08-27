const base = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live PHP</title>
  <style>
    body{ font-family:sans-serif; margin-top:1rem; }
    a{ text-transform:uppercase; color:red }
    h1,p,a{ margin-left:1rem; height: 3rem;}
  </style>
</head>
<body>`;

export const content = {
  home: `
  ${base}
  <h1>Welcome Home Page</h1>
  <p>Edit Me please</p>
  <a href="../" >Navigate to rootfile</a>
</body>
</html>
  `,
  root: `
  ${base}
  <h1>Hello dev! 👌</h1>
  <p>Edit Me please</p>
  <a href="./views/home.php" >Navigate to Home Page</a>
</body>
</html>`,
};
