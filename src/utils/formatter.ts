export function formatFileSize(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(mb) + ' MB';
}