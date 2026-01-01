import { Pipe, PipeTransform } from '@angular/core';
import { ItemTypes } from '../model/ItemTypes';

@Pipe({ name: 'itemTypeDesc' })
export class ItemTypeDescriptionPipe implements PipeTransform {
  transform(value: ItemTypes): string {
    switch (value) {
      case ItemTypes.None: return 'None';
      case ItemTypes.Product: return 'Product';
      case ItemTypes.Service: return 'Service';
      default: return 'Unknown';
    }
  }
}
