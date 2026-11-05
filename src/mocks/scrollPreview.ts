// Temporary content for inspecting the App Shell scroll container.
export const scrollPreviewRows = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  duration: `${3 + index % 4}:${String(index * 7 % 60).padStart(2, '0')}`,
}))
