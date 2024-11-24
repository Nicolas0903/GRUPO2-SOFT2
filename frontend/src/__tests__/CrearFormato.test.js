import { exportToCSV, exportToJSON, exportToTXT } from "../views/InicioPage/InicioPage";

// Mock face-api.js
jest.mock('face-api.js', () => ({
    nets: {
        tinyFaceDetector: { loadFromUri: jest.fn() },
        faceLandmark68Net: { loadFromUri: jest.fn() },
        faceExpressionNet: { loadFromUri: jest.fn() },
    },
    detectAllFaces: jest.fn(),
    resizeResults: jest.fn(),
    draw: {
        drawDetections: jest.fn(),
        drawFaceLandmarks: jest.fn(),
    },
    matchDimensions: jest.fn(),
}));

describe("Funciones de exportación", () => {
    const mockEmotionData = [
        { Emocion: "Feliz", Confianza: 0.95 },
        { Emocion: "Triste", Confianza: 0.85 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe exportar a CSV correctamente", () => {
        const mockDownloadFile = jest.fn();
        exportToCSV(mockEmotionData, mockDownloadFile);
        console.log('exportToCSV llamado');
        expect(mockDownloadFile).toHaveBeenCalledTimes(1);
        expect(mockDownloadFile).toHaveBeenCalledWith(
            expect.stringContaining("data:text/csv;charset=utf-8,"),
            "emotion_data.csv"
        );
    });

    it("debe exportar a JSON correctamente", () => {
        const mockDownloadFile = jest.fn();
        exportToJSON(mockEmotionData, mockDownloadFile);
        console.log('exportToJSON llamado');
        expect(mockDownloadFile).toHaveBeenCalledTimes(1);
        expect(mockDownloadFile).toHaveBeenCalledWith(
            expect.stringContaining("data:text/json;charset=utf-8,"),
            "emotion_data.json"
        );
    });

    it("debe exportar a TXT correctamente", () => {
        const mockDownloadFile = jest.fn();
        exportToTXT(mockEmotionData, mockDownloadFile);
        console.log('exportToTXT llamado');
        expect(mockDownloadFile).toHaveBeenCalledTimes(1);
        expect(mockDownloadFile).toHaveBeenCalledWith(
            expect.stringContaining("data:text/plain;charset=utf-8,"),
            "emotion_data.txt"
        );
    });
});
