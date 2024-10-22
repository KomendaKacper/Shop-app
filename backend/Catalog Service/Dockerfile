# Używaj mniejszego obrazu bazowego OpenJDK
FROM openjdk:21-jdk-slim

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie pliku JAR do kontenera
COPY target/*.jar /app/app.jar
EXPOSE 8001
RUN mvn clean install -DskipTests

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
