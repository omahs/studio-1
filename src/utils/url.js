export const getUrl = (subdomain, templateId) => {
    const environmentPrefix = process.env.REACT_APP_HOST_ENV === 'production' ? '' : `${process.env.REACT_APP_HOST_ENV}.`;
    const subdomainPrefix = subdomain ? `${subdomain}.` : '';
    const templatePrefix = templateId ? `/${templateId}` : '';
    return `https://${subdomainPrefix}${environmentPrefix}dappify.com${templatePrefix}`;
}