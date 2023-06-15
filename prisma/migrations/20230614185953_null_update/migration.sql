-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_TaskItem" ("createdAt", "description", "id", "isCompleted", "updatedAt") SELECT "createdAt", "description", "id", "isCompleted", "updatedAt" FROM "TaskItem";
DROP TABLE "TaskItem";
ALTER TABLE "new_TaskItem" RENAME TO "TaskItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
