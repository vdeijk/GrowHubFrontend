export interface CopyPasteModel {
  type: 'Batch' | 'Crop';
  data: {
    id: number;
    name: string;
  };
}
