// Inspired by https://github.com/cooperhewitt/py-cooperhewitt-swatchbook
RGBColor = function(r, g, b, name, hex) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.name = name;
  this.hex = hex;
};
RGBColor.from_hex = function (hex, name) {
  hex = hex.replace('#','');
  return new RGBColor(
    parseInt(hex.substring(0,2),16) / 255.0,
    parseInt(hex.substring(2,4),16) / 255.0,
    parseInt(hex.substring(4,6),16) / 255.0,
    name,
    hex
  )
}
RGBColor.prototype = {
  distance: function(other) {
    return (
      Math.pow(other.r - this.r, 2) +
      Math.pow(other.g - this.g, 2) +
      Math.pow(other.b - this.b, 2)
    )
  },
  distance_delta_e: function(other) {

  }
};

Palette = function() {
  this.colors = [];
};
Palette.prototype = {
  load: function(colors) {
    var self = this;
    colors.forEach(function(i) {
      self.add(RGBColor.from_hex(i.hex, i.name))
    });
  },
  add: function(color) {
    this.colors.push(color);
  },
  closest: function(color) {
    var best_distance = Infinity;
    var best_color = null;
    this.colors.forEach(function(i) {
      var distance = color.distance(i);
      if (distance < best_distance) {
        best_distance = distance;
        best_color = i;
      }
    });
    return best_color;
  },
  closest_delta_e: function(color) {
    // magic
  }
}
