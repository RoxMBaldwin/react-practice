import React from 'react';
import '../index.css';

const Message = ({
  message,
  toggleStar,
  toggleSelected
}) => {
  const isRead = message.read ? 'read' : 'unread'
  const isSelected = message.selected ? 'selected' : ''
  const isStarred = message.starred ? 'fa-star' : 'fa-star-o'
  const isLabelled = message.labels.map((label, i) => (
    <span key={i} className="label label-warning">{label}</span>
  ))
  return (
      <div className={`row message ${isRead} ${isSelected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={message.selected} onChange={() => toggleSelected(message)}/>
            </div>
            <div className="col-xs-2" onClick={() => toggleStar(message.id)}>
              <i className={`star fa ${isStarred}`}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {isLabelled}
          <a>
            {message.subject}
          </a>
        </div>
      </div>
    );
}

export default Message
