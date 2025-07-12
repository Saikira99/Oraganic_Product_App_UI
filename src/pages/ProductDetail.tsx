import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getFeedbackByProduct, submitFeedback } from '../services/api';
import { Product, Feedback } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then(res => setProduct(res.data))
      .then(() => getFeedbackByProduct(id).then(res => setFeedbacks(res.data)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await submitFeedback({ productId: id, name, message });
    const res = await getFeedbackByProduct(id);
    setFeedbacks(res.data);
    setName('');
    setMessage('');
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container">
      <button onClick={() => window.history.back()}>← Back</button>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Certification:</strong> {product.certification}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <hr />
      <h3>Submit Feedback</h3>
      <form onSubmit={handleSubmit} className="feedback-form">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your Message" required />
        <button type="submit">Submit</button>
      </form>
      <h3>Feedback</h3>
      {feedbacks.map((fb) => (
        <div key={fb._id} className="feedback-item">
          <p><strong>{fb.name}</strong> <em>said:</em></p>
          <p>{fb.message}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
