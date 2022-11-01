export default {
	preset: 'ts-jest',
	collectCoverageFrom: ["src/**"],
	testEnvironment: 'node',
	testMatch: ["**/__tests__/**/*.test.ts?(x)"]
};