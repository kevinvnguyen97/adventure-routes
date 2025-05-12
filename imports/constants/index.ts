import { Meteor } from "meteor/meteor";
interface Secret {
  public: {
    oauth: {
      googleMapsApiKey: string;
    };
  };
}
export const SECRETS = Meteor.settings as unknown as Secret;
