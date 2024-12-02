package com.example.api_gateway;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;

@SpringBootApplication
@EnableDiscoveryClient
@OpenAPIDefinition(info = @Info(title = "API Gateway", version = "1.0", description = "Documentation API Gateway v1.0"))
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Bean
	public RouteLocator routeLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				// Route for Catalog Service Swagger documentation
				.route("catalog-service-docs", r -> r.path("/catalog-service/v3/api-docs")
						.and().method(HttpMethod.GET)
						.uri("lb://catalog-service"))

				// Route for Auth Service Swagger documentation
				.route("auth-service-docs", r -> r.path("/auth-service/v3/api-docs")
						.and().method(HttpMethod.GET)
						.uri("lb://auth-service"))

				// Route for Swagger UI (assuming Swagger UI is hosted in API Gateway)
				.route("swagger-ui", r -> r.path("/swagger-ui/**")
						.filters(f -> f.rewritePath("/swagger-ui/(?<segment>.*)", "/${segment}"))
						.uri("forward:/swagger-ui.html"))

				.build();
	}
}
