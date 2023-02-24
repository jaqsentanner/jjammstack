require('dotenv').config({
    path: require('find-config')('.env')
});

const emailTemplates = {

    newRegistration: function(toEmail, username){
        return {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: `Welcome to jjamms(t)ack! You've entered a new phase in your development journey. We have been expecting you, ${username}.`,
            text: 'We thank you for registering!',
            html: `<h1>Welcome to jjamms(t)ack!</h1> 
            <br>
            <h2> We thank you for registering. We know you won't regret it.</h2>
            <br>
            <h3>Start your journey with your first post. Otherwise, engage with others by commenting!</h3>
            <br>
            <hr>
            <strong> Best, </strong>
            <br>
            <strong> ~ The Dev Team 💻 </strong>
      `
        }
    },
}

module.exports = emailTemplates;