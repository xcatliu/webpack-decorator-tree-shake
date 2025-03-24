export function add(a, b) {
  return a + b;
}

function sealed(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

/*#__PURE__*/
@sealed
class Foo {
  sub() {
    console.log("hello");
  }
}
