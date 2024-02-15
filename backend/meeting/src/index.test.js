// describe("metadata microservice", () => {

//     //
//     // Setup mocks.
//     //

//     const mockListenFn = jest.fn((port, callback) => callback());
//     const mockGetFn = jest.fn();

//     jest.doMock("express", () => { // Mock the Express module.
//         const express = () => { // The Express module is a factory function that creates an Express app object.
//             return { // Mock Express app object.
//                 listen: mockListenFn, // Mock listen function.
//                 get: mockGetFn, // Mock get function.
//                 use: () => {}, // Mock use function.

//             };
//         };
//         express.json = () => {}; // Mock json function.
//         return express;
//     });

//     // Import the module we are testing.
//     const { startMicroservice } = require("./index");

//     //
//     // Define tests.
//     //

//     test("microservice starts web server on startup", async () => {

//         await startMicroservice(4000, () => {}, "videos");

//         expect(mockListenFn.mock.calls.length).toEqual(1);     // Check only 1 call to 'listen'.
//         expect(mockListenFn.mock.calls[0][0]).toEqual(4000);   // Check for port 4000.
//     });

//     test("/video route is handled", async () => {

//         await startMicroservice(4000, () => {}, "videos");

//         const videoRoute = mockGetFn.mock.calls[0][0];
//         expect(videoRoute).toEqual("/video");
//     });

//     // ... more tests go here ...
// });
