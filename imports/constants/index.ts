import { Libraries } from "@react-google-maps/api";
import { Meteor } from "meteor/meteor";

interface Secret {
  public: {
    oauth: {
      googleMapsApiKey: string;
    };
  };
}
export const SECRETS = Meteor.settings as unknown as Secret;
export const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];
