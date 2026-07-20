# ---------- Etapa de compilación ----------
FROM maven:3.9.15-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# ---------- Etapa de ejecución ----------
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]