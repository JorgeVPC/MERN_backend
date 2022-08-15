import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // enviar el email de registro
  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta del AVP",
    html: `<p> Hola : ${nombre}, comprueba tu cuenta en APV. </p>
    <p> Tu cuenta esta lista, pero debes verificar en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/Confirmar/${token}">Comprobar cuenta </a> </p>
    <p>Si tu no creaste la cuenta, ignora este mensaje</p>
            `,
  });
  console.log("Mensaje enviado: %S", info.messageId);
};

export default emailRegistro;
