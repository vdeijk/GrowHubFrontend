export interface CopyPasteModel {
  type: 'Batch' | 'Crop';
  data: {
    id: string;
    name: string;
  };
}
