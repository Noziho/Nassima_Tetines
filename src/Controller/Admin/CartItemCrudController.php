<?php

namespace App\Controller\Admin;

use App\Entity\CartItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class CartItemCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CartItem::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
