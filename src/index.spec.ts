import { greet } from "./index";

it('should greet', () => {
    expect(greet('world')).toEqual('hello world');
})