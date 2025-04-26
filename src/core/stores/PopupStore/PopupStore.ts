import { makeAutoObservable } from 'mobx';
import React from 'react';

class PopupStore {
  public isOpen = false;
  public content: React.ReactNode = null;

  constructor() {
    makeAutoObservable(this);
  }

  public openPopup = (content: React.ReactNode) => {
    this.isOpen = true;
    this.content = content;
  };

  public closePopup = () => {
    this.isOpen = false;
    this.content = null;
  };
}

const popupStore = new PopupStore();
export default popupStore;
