function Socks(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

Socks.prototype = Object.assign(Underwear.prototype);
Socks.prototype.constructor = Socks;