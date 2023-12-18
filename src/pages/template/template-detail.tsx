import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateForm } from './form';

const TemplateDetail = memo(() => {
  const { id } = useParams();
  return <TemplateForm id={id} />;
});

export default TemplateDetail;
