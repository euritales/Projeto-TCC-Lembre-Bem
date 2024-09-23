import org.jetbrains.kotlin.gradle.tasks.KotlinCompile


plugins {
	id("org.springframework.boot") version "2.6.4" // Versão atualizada
	id("io.spring.dependency-management") version "1.0.11.RELEASE" // Versão atualizada
	kotlin("jvm") version "1.6.10" // Versão atualizada
	kotlin("plugin.spring") version "1.6.10" // Versão atualizada
	kotlin("plugin.jpa") version "1.6.10" // Versão atualizada

}


group = "com.ifba"
version = "0.0.1-SNAPSHOT"


java {
	sourceCompatibility = JavaVersion.VERSION_17
}


repositories {
	mavenCentral()
}


dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
//	implementation("org.flywaydb:flyway-core")
//	implementation("org.flywaydb:flyway-mysql")
	runtimeOnly ("mysql:mysql-connector-java")
//	runtimeOnly("mysql:mysql-connector-java:8.0.12")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}


tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}


tasks.withType<Test> {
	useJUnitPlatform()
}
