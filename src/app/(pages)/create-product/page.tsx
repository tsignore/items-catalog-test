"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductsStore } from "@/entities/Product/model/hooks/useProductsStore";
import { Button } from "@/shared/ui/Button/Button";

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct } = useProductsStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Название обязательно";
    if (!formData.description.trim())
      newErrors.description = "Описание обязательно";
    if (!formData.price.trim()) newErrors.price = "Цена обязательна";
    if (isNaN(Number(formData.price)))
      newErrors.price = "Цена должна быть числом";
    if (Number(formData.price) <= 0)
      newErrors.price = "Цена должна быть больше 0";
    if (!formData.category.trim()) newErrors.category = "Категория обязательна";
    if (!formData.image.trim()) newErrors.image = "Изображение обязательно";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProduct = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category.trim(),
      image: formData.image.trim(),
    };

    addProduct(newProduct);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6 mt-20">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            placeholder="Введите название продукта"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            rows={4}
            placeholder="Введите описание продукта"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Цена
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            placeholder="Введите цену продукта"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            placeholder="Введите категорию продукта"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ссылка на изображение
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            placeholder="Введите ссылку на изображение"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="filled"
          color="primary"
          className="w-full"
          size="large"
        >
          Создать продукт
        </Button>
      </form>
    </div>
  );
}
