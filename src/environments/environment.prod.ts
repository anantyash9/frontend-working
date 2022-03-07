export const environment = {
  production: false,
  envName: "local",
  keycloak: {
    // Url of the Identity Provider
    issuer:
      "https://keycloak.developers.surveymaster.in/auth",

    // Realm
    realm: "openhack",

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: "public",
  },
};