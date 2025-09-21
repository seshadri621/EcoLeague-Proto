import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { Textarea } from 'components/ui/Textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'components/ui/Dialog';

const AddOpinionModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [opinion, setOpinion] = useState('');

  const handleSubmit = () => {
    if (title && opinion) {
      onSubmit({ title, opinion });
      onClose(); // Close modal on successful submission
      setTitle('');
      setOpinion('');
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="Plus" size={20} />
            <span>Share Your Opinion</span>
          </DialogTitle>
          <DialogDescription>
            What's on your mind? Share your thoughts, ideas, or questions with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your post"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="opinion"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              placeholder="Express your opinion here..."
              className="col-span-4"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOpinionModal;
