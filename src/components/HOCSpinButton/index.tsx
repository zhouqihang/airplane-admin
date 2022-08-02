import { Button, ButtonProps } from 'antd';
import React, { useState } from 'react';

interface IHOCProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: (event: React.MouseEvent<HTMLElement>) => Promise<any> | void
}

const HOCSpinButton = () => {
  return function (props: IHOCProps & React.RefAttributes<HTMLElement>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    function rewriteOnClick(event: React.MouseEvent<HTMLElement>) {
      if (props.onClick) {
        const res = props.onClick(event);
        if (res instanceof Promise) {
          setLoading(true);
          res.then(() => setLoading(false))
        }
      }
    }
    return (
      <Button {...props} loading={loading} onClick={rewriteOnClick} />
    )
  }
}

export default(HOCSpinButton);