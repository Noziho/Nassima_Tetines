<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    public function __construct (private AdminUrlGenerator $adminUrlGenerator) {

    }
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $url = $this->adminUrlGenerator
            ->setController(UserCrudController::class)
            ->generateUrl()
        ;

        return $this->redirect($url);


    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Nassima Tetines');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Accueil', 'fa fa-home');

        yield MenuItem::section('Utilisateurs');
        yield MenuItem::subMenu('Actions', 'fas fa-bars')->setSubItems([
            MenuItem::linkToCrud('Tout les utilisateurs', 'fas fa-eye', User::class),
        ]);

        yield MenuItem::section('Produits');
        yield MenuItem::subMenu('Actions', 'fas fa-bars')->setSubItems([
            MenuItem::linkToCrud('Tout les produits', 'fas fa-eye', Product::class),
            MenuItem::linkToCrud('Ajouter un produit', 'fas fa-plus', Product::class)->setAction(Crud::PAGE_NEW),
        ]);

        yield MenuItem::section('Catégories');
        yield MenuItem::subMenu('Actions', 'fas fa-bars')->setSubItems([
            MenuItem::linkToCrud('Toutes les catégories', 'fas fa-eye', Category::class),
            MenuItem::linkToCrud('Ajouter une catégorie', 'fas fa-plus', Category::class)->setAction(Crud::PAGE_NEW),
        ]);

        yield MenuItem::section('Commandes');
        yield MenuItem::subMenu('Actions', 'fas fa-bars')->setSubItems([
            MenuItem::linkToCrud('Toutes les commandes', 'fas fa-eye', Order::class),
            MenuItem::linkToCrud('Ajouter une commande', 'fas fa-plus', Order::class)->setAction(Crud::PAGE_NEW),
        ]);




    }
}
