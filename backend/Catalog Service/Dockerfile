# Użyj obrazu z Javą i Mavenem
FROM maven:3.9.9-eclipse-temurin-21 AS builder

# Ustaw katalog roboczy
WORKDIR /app

# Kopiuj pliki pom.xml i src do katalogu roboczego
COPY pom.xml .
COPY src ./src

# Buduj aplikację
RUN mvn clean install -DskipTests

# Stwórz ostateczny obraz z aplikacją
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Uruchom aplikację
ENTRYPOINT ["java", "-jar", "app.jar"]
