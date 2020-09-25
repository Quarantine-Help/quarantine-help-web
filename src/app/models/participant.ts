import { Deserializable } from './shared';
import { User } from './user';
export class Participant implements Deserializable {
  id?: number;
  user: User;
  position: {
    longitude: string;
    latitude: string;
  };
  type: string;
  firstLineOfAddress: string;
  secondLineOfAddress?: string;
  country: string;
  placeId: string;
  postCode: string;
  city: string;
  phone: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
