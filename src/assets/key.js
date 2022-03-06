function initializeKeycloak(keycloak) {
    // const keycloak = new KeycloakService();
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloak.issuer,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
          onLoad: "login-required",
          checkLoginIframe: true,
        },
        bearerExcludedUrls: [],
      });
  }