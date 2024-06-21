import { Props } from "./types";


export default class History {
  private history_: Props[] = [];
  private index_: number = 0;

  get size() {
    return this.history_.length;
  }

  get index() {
    return this.index_;
  }

  get current() {
    return this.history_[this.index_];
  }

  add(props:Props) {
    if (Object.is(props, this.current)) {
      console.log("same");
      return;
    }
    console.log("adding", props);
    this.history_.splice(this.index_, this.history_.length - this.index_, props);
    this.index_ = this.history_.length;
  }

  undo(){
    if (!this.has_undo()) return undefined;
    console.log('undo', this.index_ - 1)
    return this.history_[--this.index_];
  }

  has_undo() {
    return this.index_ !== 0;
  }

  redo() {
    if (!this.has_redo()) return undefined;
    console.log('redo', this.index_)
    return this.history_[this.index_++];
  }

  has_redo() {
    return this.index_ < this.history_.length;
  }
}