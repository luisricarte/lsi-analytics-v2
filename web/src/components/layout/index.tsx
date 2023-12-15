import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { APP_DESCRIPTION } from '@/constants/meta';
import { cn } from '@/utils';

import { Footer } from './Footer';
import { LeftBar } from './LeftBar';
import { Navbar } from './Navbar';
import { RightBar } from './RightBar';
import { Topbar } from './Topbar';

type AlertMessage = {
  message: string;
  type: 'warning' | 'danger' | 'info';
};

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
  breadcrumb?: React.ReactNode;
  title?: string;
  description?: string;
  leftBar?: React.ReactNode;
  rightBar?: React.ReactNode;
  rightContent?: React.ReactNode;
  alert?: AlertMessage;
  Guards?: (() => Promise<boolean> | boolean)[];
  footer?: string | React.ReactNode | null;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumb,
  className,
  title: _title,
  description: _description,
  leftBar,
  rightBar,
  rightContent,
  alert,
  footer,
}) => {
  const title = _title ? `${_title} | LSI Analytics` : 'LSI Analytics';
  const description = _description ?? APP_DESCRIPTION;

  const renderFooter = () => {
    if (footer === null) {
      return null;
    }

    return footer ? <>{footer}</> : <Footer />;
  };

  const renderAlertMessage = (_alert: AlertMessage) => {
    switch (_alert.type) {
      case 'warning':
        return (
          <div className="flex w-full items-center justify-center gap-2 bg-amber-500 py-3 text-zinc-50">
            <AlertTriangle />
            {_alert.message}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="flex flex-col">
        {alert && renderAlertMessage(alert)}
        <div className="flex">
          <Navbar />
          <div className="w-full md:ml-16">
            <Topbar breadcrumb={breadcrumb} rightContent={rightContent} />
            {leftBar && <LeftBar>{leftBar}</LeftBar>}
            <main
              className={cn(
                'mt-14',
                leftBar && 'ml-80',
                rightBar && 'mr-80',
                className,
              )}
            >
              {children}
              {renderFooter()}
            </main>
            {rightBar && <RightBar>{rightBar}</RightBar>}
          </div>
        </div>
      </div>
    </>
  );
};
