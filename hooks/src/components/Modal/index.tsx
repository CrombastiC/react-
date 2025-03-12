import { createPortal } from 'react-dom';
import './index.css';
// 我更推荐使用createPortal因为他更灵活，可以挂载到任意位置，
// 而position: fixed,会有很多问题，在默认的情况下他是根据浏览器视口进行定位的
// ，但是如果父级设置了transform、perspective、filter 或 backdrop-filter 属性非 none 时
// ，他就会相对于父级进行定位，这样就会导致Modal组件定位不准确(他不是一定按照浏览器视口进行定位)，所以不推荐使用。
export const Modal = () => {
  return createPortal(<div className="modal">
    <div className="modal-header">
      <div className="modal-title">标题</div>
    </div>
    <div className="modal-content">
      <h1>Modal</h1>
    </div>
    <div className="modal-footer">
      <button className="modal-close-button">关闭</button>
      <button className="modal-confirm-button">确定</button>
    </div>
  </div>, document.body);
}
