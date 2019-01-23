var loginPanel = new LoginPanel;
var homePanel = new HomePanel;
var registerPanel = new RegisterPanel;

document.body.appendChild(loginPanel.element);
document.body.appendChild(homePanel.element);
document.body.appendChild(registerPanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            loginPanel.hide();

            homePanel.user = user;
            homePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

homePanel.onLogout = function() {
    homePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

loginPanel.onRegisterLink = function() {
    loginPanel.clear();
    loginPanel.hide();
    registerPanel.show();
};

registerPanel.onLoginLink = function() {
    registerPanel.clear();
    registerPanel.hide();
    loginPanel.show();
};

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation) {
    try {
        register(name, surname, email, password, passwordConfirmation, function () {
            registerPanel.clear();
            registerPanel.hide();
            loginPanel.show();
        });
    } catch (err) {
        registerPanel.error = err.message;
    }
};

homePanel.onSearch = function(query) {
    search(query, function(error, ducklings) {
        if (error) homePanel.listNoResults = error;
        else homePanel.listResults = ducklings;
    });
}


// var loginPanel2 = new LoginPanel

// document.body.appendChild(loginPanel2.element);

// loginPanel2.onLogin = function(email, password) {
//     console.log('llama a otra logica', email, password);
// };


// var mainPanel = new Panel

// var registerPanel = new RegisterPanel
// var welcomePanel = new WelcomePanel

// mainPanel.add(loginPanel)
// mainPanel.add(registerPanel)
// mainPanel.add(welcomePanel)

// loginPanel.onLogin = function() {}

// ...
