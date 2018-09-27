import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-component2',
  styleUrl: 'my-component2.css',
  shadow: true
})
export class MyComponent2 {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Yo, World! I'm {this.first} {this.last}
      </div>
    );
  }
}
