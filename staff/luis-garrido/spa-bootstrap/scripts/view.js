'use strict';

//#region panel

function Panel($element) {
    this.$element = $element;
}

Panel.prototype.hide = function () {
    this.$element.hide();
};

Panel.prototype.show = function () {
    this.$element.show();
};

// class Panel {
//     constructor($element) {
//         this.$element = $element;
//     }   

//     hide() { this.$element.hide(); }

//     show() { this.$element.show(); }
// };

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, $('<section class="login container border">'
        + '<h2>Login</h2>'
        + '<form class="login__form">'
        +   '<div class="row">'
        +       '<div class="col-12 col-md-6">'
        +           '<label for="email">E-mail:</label>'
        +           '<input type="email" name="email" placeholder="email" class="form-control" required>'
        +       '</div>'
        +       '<div class="col-12 col-md-6">'
        +           '<label for="password">Password:</label>'
        +           '<input type="password" name="password" placeholder="password" class="form-control" required>'
        +       '</div>'
        +   '</div>'
        +   '<div class="row">'
        +       '<button type="submit" class="login-button btn btn-primary btn-lg">Login</button>'
        +   '</div>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.find("input");

    this.__$emailInput__ = $($inputs[0]);

    this.__$passwordInput__ = $($inputs[1]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    // // var $registerLink = $('<a href="#" class="login__register-link badge badge-warning navbar-brand">Register</a>');
    // // $container.append($registerLink);
    // // this.__$registerLink__ = $registerLink;

    // var $registerLink = $('<button class="btn btn-warning btn-lg">Register</button>');
    // $container.append($registerLink);
    // this.__$registerLink__ = $registerLink;

    var $registerLink = $('<button class="btn btn-warning btn-lg">Register</button>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        }.bind(this));
    }
});

Object.defineProperty(LoginPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

LoginPanel.prototype.clear = function () {
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, 'onGoToRegister', {
    set: function (callback) {
        this.__$registerLink__.on('click', callback);
    }
});

//#endregion

//#region register panel

function RegisterPanel() {
    Panel.call(this, $('<section class="register container border">'
        + '<h2>Register</h2>'
        + '<form class="register__form">'
        +   '<div class="row">'
        +       '<div class="col-12 col-md-6">'
        +           '<label for="name">Name:</label>'
        +           '<input type="text" name="name" placeholder="name" class="form-control" required>'
        +       '</div>'
        +       '<div class="col-12 col-md-6">'
        +           '<label for="surname">Surname:</label>'
        +           '<input type="text" name="surname" placeholder="surname" class="form-control" required>'
        +       '</div>'
        +       '<div class="col-12">'
        +           '<label for="email">E-mail:</label>'
        +           '<input type="email" name="email" placeholder="email" class="form-control" required>'
        +       '</div>'
        +       '<div class="col-12 col-md-6">'
        +           '<label for="password">Password:</label>'
        +           '<input type="password" name="password" placeholder="password" class="form-control" required>'
        +       '</div>'
        +       '<div class="col-12 col-md-6">'
        +           '<label for="password">Confirm Password:</label>'
        +           '<input type="password" name="password-confirmation" placeholder="password" class="form-control" required>'
        +       '</div>'
        +   '</div>'
        +   '<div class="row">'
        +       '<button class="login-button btn btn-primary btn-lg" type="submit">Register</button>'
        +   '</div>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    this.__$form__ = $container.children('form');
    var $form = this.__$form__;

    var $inputs = $form.find("input");
    this.__$nameInput__ = $($inputs[0]);

    this.__$surnameInput__ = $($inputs[1]);

    this.__$emailInput__ = $($inputs[2]);

    this.__$passwordInput__ = $($inputs[3]);

    this.__$passwordConfirmationInput__ = $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<button class="btn btn-warning btn-lg">Login</button>');
    $container.append($loginLink)
    this.__$loginLink__ = $loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        }.bind(this));
    }
});

Object.defineProperty(RegisterPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

RegisterPanel.prototype.clear = function () {
    this.__$nameInput__.val('');
    this.__$surnameInput__.val('');
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__$passwordConfirmationInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(RegisterPanel.prototype, 'onGoToLogin', {
    set: function (callback) {
        this.__$loginLink__.on('click', callback);
    }
});

//#endregion

//#region home panel

function HomePanel() {
    Panel.call(this, $('<section class="home container border">'
        + '<h2>Welcome, <span class="home__name"></span>!</h2>'
        + '<button style="margin-bottom: 0.75em;" class="home__logout float-right btn btn-primary btn-lg">Logout</button>'
        + '</section>'));

    var $container = this.$element;

    var $title = $container.children('h2');

    var $userSpan = $title.children('span');
    this.__$userSpan__ = $userSpan;

    this.__$logoutButton__ = $container.children('button');
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', {
    set: function (user) {
        this.__$userSpan__.text(user.name);
    }
});

Object.defineProperty(HomePanel.prototype, 'onLogout', {
    set: function (callback) {
        this.__$logoutButton__.on('click', callback);
    }
});

//#endregion

//#region search panel

function SearchPanel() {
    Panel.call(this, $('<section>'
        + '<form>'
        + '<input type="text" class="form-control" placeholder="Search for tiny rubber ducklings..." name ="query">'
        + '<button style="margin: 0.75em 0;" class="btn btn-warning btn-lg" type="submit">Search</button>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $queryInput = $form.children('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $('<div class="resultList"><ul></ul></div>');
    $container.append($resultList);
    this.__$resultList__ = $resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {

            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        }.bind(this));
    }
});

Object.defineProperty(SearchPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

Object.defineProperty(SearchPanel.prototype, 'results', {
    set: function (results) {
        this.__$resultList__.html('');
        this.__errorPanel__.hide();

        results.forEach(function (result) {
            var $item = $('<li><div class="card col-3" style="max-width: 240px;"><div class="card-header">' + result.text + ' </div><div class="card-body"><img src="' + result.image + '" width="100%"></div><div>' + result.price + '</div><div>' + result.id + '</div><button style="margin-bottom: 0.75em;" class="search__view-more float-right btn btn-primary btn-lg">View More</button>           </div></li>');
            this.__$resultList__.append($item);

        }.bind(this));
    }
});

SearchPanel.prototype.clear = function () {
    this.clearResults();
    this.__$queryInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

SearchPanel.prototype.clearResults = function () {
    this.__$resultList__.html('');
};

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<section class="error mb-2 text-center bg-danger"></section>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion 