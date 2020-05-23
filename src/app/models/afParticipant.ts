import { Deserializable } from './shared';

export class AfParticipant implements Deserializable {
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
