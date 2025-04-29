import { makeAutoObservable } from 'mobx';
import React from 'react';

class PopupService {
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

const popupService = new PopupService();
export default popupService;
