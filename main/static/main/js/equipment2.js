// Equipment page JavaScript - Part 2 (CSS Styles and Additional Functions)

// Додаткові CSS стилі для модального вікна
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .certificate-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        background: var(--white);
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid var(--gray-light);
    }
    
    .modal-header h3 {
        color: var(--navy);
        font-size: 1.3rem;
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--gray);
        cursor: pointer;
        transition: color 0.2s ease;
    }
    
    .modal-close:hover {
        color: var(--purple);
    }
    
    .modal-body {
        padding: 1rem 2rem 2rem;
    }
    
    .certificate-details {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: var(--beige-light);
        border-radius: 8px;
    }
    
    .detail-label {
        font-weight: 600;
        color: var(--navy);
    }
    
    .detail-value {
        color: var(--purple);
        font-weight: 700;
    }
    
    .spec-item {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    @media (max-width: 768px) {
        .table-row .row-item:not(.feature) {
            position: relative;
            padding-left: 50% !important;
        }
        
        .table-row .row-item:not(.feature)::before {
            content: attr(data-label) ': ';
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-weight: 600;
            color: var(--navy);
        }
    }
`;
document.head.appendChild(modalStyles);

// Відстеження завантаження
console.log('Equipment page JavaScript Part 2 loaded successfully'); 