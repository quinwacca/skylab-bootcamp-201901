'use strict';

//#region panel

class Panel {
    constructor($element) {
        this.$element = $element;
    }   

    hide() { this.$element.hide(); }

    show() { this.$element.show(); }
};

//#endregion

//#region login panel

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="login container border">
    <h2>Login</h2>
    <form class="login__form">
        <div class="row">
            <div class="col-12 col-md-6">
                <label for="email">E-mail:</label>
                <input type="email" name="email" placeholder="email" class="form-control" required>
            </div>
            <div class="col-12 col-md-6">
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="password" class="form-control" required>
            </div>
        </div>
        <div class="row">
            <button type="submit" class="login-button btn btn-primary btn-lg">Login</button>
        </div>
    </form>
</section>`));

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
    
    set onLogin(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    
    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
}
    
//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor() {
        super($(`<section class="register container border">
    <h2>Register</h2>
    <form class="register__form">
        <div class="row">
            <div class="col-12 col-md-6">
                <label for="name">Name:</label>
                <input type="text" name="name" placeholder="name" class="form-control" required>
            </div>
            <div class="col-12 col-md-6">
                <label for="surname">Surname:</label>
                <input type="text" name="surname" placeholder="surname" class="form-control" required>
            </div>
            <div class="col-12">
                <label for="email">E-mail:</label>
                <input type="email" name="email" placeholder="email" class="form-control" required>
            </div>
            <div class="col-12 col-md-6">
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="password" class="form-control" required>
            </div>
            <div class="col-12 col-md-6">
                <label for="password">Confirm Password:</label>
                <input type="password" name="password-confirmation" placeholder="password" class="form-control" required>
            </div>
        </div>
        <div class="row">
            <button class="login-button btn btn-primary btn-lg" type="submit">Register</button>
        </div>
    </form>
</section>`));

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
    
    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();
                
            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();
                
            callback(name, surname, email, password, passwordConfirmation);
        });
    }
    
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    
    
    clear() {
        this.__$nameInput__.val('');
        this.__$surnameInput__.val('');
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__$passwordConfirmationInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    
    set onGoToLogin(callback) {
            this.__$loginLink__.on('click', callback);
    }
}
    
//#endregion

//#region home panel

class HomePanel extends Panel {
    constructor() {
        super($(`<section class="home container border">
    <h2>Welcome, <span class="home__name"></span>!</h2>
    <button style="margin-bottom: 0.75em;" class="home__logout float-right btn btn-primary btn-lg">Logout</button>
</section>`));

        var $container = this.$element;

        var $title = $container.children('h2');

        var $userSpan = $title.children('span');
        this.__$userSpan__ = $userSpan;

        this.__$logoutButton__ = $container.children('button');
    }

    set user(user) {
        this.__$userSpan__.text(user.name);
    }
    
    set onLogout(callback) {
            this.__$logoutButton__.on('click', callback);
    }
}
//#endregion
  
//#region search panel
    
class SearchPanel extends Panel {
    constructor() {
        super($(`<section>
    <form>
        <input type="text" class="form-control" placeholder="Search for tiny rubber ducklings..." name ="query">
        <button style="margin: 0.75em 0;" class="btn btn-warning btn-lg" type="submit">Search</button>
    </form>
</section>`));
        
        var $container = this.$element;
        
        var $form = $container.children('form');
        this.__$form__ = $form;
        
        var $queryInput = $form.children('input');
        this.__$queryInput__ = $queryInput;

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        // var $resultList = $('<div class="resultList"><ul></ul></div>');
        // $container.append($resultList);
        // this.__$resultList__ = $resultList;
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        });
    }
    
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
    
    // set results(results) {
    //     this.__$resultList__.html('');
    //     this.__errorPanel__.hide();
    
    //     results.forEach(function (result) {
    //         var $item = $('<li><div class="card col-3" style="max-width: 240px;"><div class="card-header">' + result.text + ' </div><div class="card-body"><img src="' + result.image + '" width="100%"></div><div>' + result.price + '</div><div>' + result.id + '</div><button style="margin-bottom: 0.75em;" class="search__view-more float-right btn btn-primary btn-lg">View More</button></div></li>');
    //         this.__$resultList__.append($item);
    //     }.bind(this));
    // }
    
//     clear() {
//         this.clearResults();
//         this.__$queryInput__.val('');
//         this.__errorPanel__.message = '';
//         this.__errorPanel__.hide();
//     }
    
//     clearResults() {
//         this.__$resultList__.html('');
//     }
// }
    clear() {
        this.__$queryInput__.val('');
        this.clearError();
    }

    clearError() {
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
}
//#endregion

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
            <ul></ul>
        </section>`));

        var $resultList = this.$element.find('ul');
        this.__$resultList__ = $resultList;
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $(`<li data-id=${result.id}>
    <div class="card col-3" style="max-width: 240px;">
        <div class="card-header">${result.text}</div>
        <div class="card-body"><img src="${result.image}" width="100%"></div>
        <div>${result.price}</div>
        <div>${result.id}</div>
        <button style="margin-bottom: 0.75em;" class="search__view-more float-right btn btn-primary btn-lg">View More</button>
    </div>                         
</li>`);
            
            $item.click(function(event) {
                // console.log(this.getAttribute('data-id'));

                // console.log(event.target.getAttribute('data-id')); // WARN event propagation!

                console.log($item.data('id'));

                // console.log($(this).data('id')); // WARN add new $ object into mem, but $item is already there
            });

            this.__$resultList__.append($item);
        });
    }

    clear() {
        this.__$resultList__.html('');
    }
}

//#region error panel

class ErrorPanel extends Panel {
    constructor() {
        super($('<section class="error mb-2 text-center bg-danger"></section>'));
    }

    set message(message) {
        this.$element.text(message);
    }
}

//#endregion 